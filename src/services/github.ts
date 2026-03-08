import axios from "axios";

const username = "nitinn13"; 

export async function getGithubStats() {
  const res = await axios.get(`https://api.github.com/users/${username}`);

  return {
    repos: res.data.public_repos,
    followers: res.data.followers,
    following: res.data.following,
    profile: res.data.html_url
  };
}