import axios from "axios";

const username = "nitinn13"; 

export async function getGithubStats() {
  const res = await axios.get(`https://api.github.com/users/${username}`);
  console.log(res.data);

  return {
    repos: res.data.public_repos,
    followers: res.data.followers,
    following: res.data.following,
    profile: res.data.html_url
  };
}

export async function getGithubRepos() {
  const res = await axios.get(
    `https://api.github.com/users/${username}/repos?sort=updated`
  );


  console.log("Github repos called ");
  console.log(res.data);

  return res.data;
}


export async function getLatestActivity() {
  const res = await axios.get(
    `https://api.github.com/users/${username}/events`
  );

  const events = res.data.slice(0, 5);

  return events.map((event: any) => {

    if (event.type === "PushEvent") {
      const commits = event.payload?.commits?.length || 1;

      return `Pushed ${commits} commit(s) to ${event.repo.name}`;
    }

    if (event.type === "PullRequestEvent") {
      return `Opened PR in ${event.repo.name}`;
    }

    if (event.type === "CreateEvent") {
      return `Created ${event.payload?.ref_type} in ${event.repo.name}`;
    }

    if (event.type === "IssuesEvent") {
      return `Opened issue in ${event.repo.name}`;
    }

    return `${event.type} in ${event.repo.name}`;
  });
}