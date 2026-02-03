import { getInput, startGroup, info, endGroup, setFailed } from '@actions/core';
import { getOctokit, context as _context } from '@actions/github';
import read from 'fs-readdir-recursive';
import fs from 'fs/promises';
import { basename } from 'path';

async function run() {
  try {
    const token = getInput('github-token');
    const directory = getInput('directory');
    const tag = getInput('tag');

    const octokit = getOctokit(token);

    const context = _context;
    const { repo: { owner, repo }, ref } = context;

    const commit = await octokit.rest.repos.getCommit({ owner, repo, ref });

    const staging = await octokit.rest.repos.getReleaseByTag({ owner, repo, tag });
    await octokit.rest.repos.deleteRelease({ owner, repo, release_id: staging.data.id });

    const newStaging = await octokit.rest.repos.createRelease({
      owner,
      repo,
      tag_name: tag,
      prerelease: true,
      body: commit.data.commit.message,
    });

    const artifacts = read('.', () => true, [], directory);

    startGroup('Assets')
    for (let file of artifacts) {
      info('uploading ' + file);

      await octokit.rest.repos.uploadReleaseAsset({
        owner, repo,
        release_id: newStaging.data.id,
        name: basename(file),
        data: await fs.readFile(file),
      });
    }
    endGroup()

    info("\u001b[1mStaging Release: " + newStaging.data.html_url);
  } catch (error) {
    setFailed(error.message);
  }
}

run();
