import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { getGithubStats } from "./services/github";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start((ctx) => {
  ctx.reply("Hello 👋 I'm Nitin's Resume Bot");
});

bot.command("about", (ctx) => {
  ctx.reply("Full-stack developer building backend systems and tools.");
});
bot.command("github", (ctx) => {
    getGithubStats().then((github) => {
      ctx.reply(`GitHub Stats:
      Repositories: ${github.repos}
      Followers: ${github.followers}
      Following: ${github.following}
      Profile: ${github.profile}`);
    });
});

bot.launch();

console.log("Bot running...");