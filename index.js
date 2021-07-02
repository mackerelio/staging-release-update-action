const core = require('@actions/core');
const github = require('@actions/github');
const read = require('fs-readdir-recursive');

async function run() {
  try {
    const fs = require('fs').promises;
    const path = require('path');

    const token = core.getInput('github-token');
    const directory = core.getInput('directory');
    const tag = core.getInput('tag');

    const octokit = github.getOctokit(token);

    const context = github.context;
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

    core.startGroup('Assets')
    for (let file of artifacts) {
      core.info('uploading ' + file);

      await octokit.rest.repos.uploadReleaseAsset({
        owner, repo,
        release_id: newStaging.data.id,
        name: path.basename(file),
        data: await fs.readFile(file),
      });
    }
    core.endGroup()

    core.info("\u001b[1mStaging Release: " + newStaging.data.html_url);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
