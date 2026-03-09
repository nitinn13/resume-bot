import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { getGithubStats } from "./services/github";
import { Markup } from "telegraf";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start((ctx) => {
  ctx.reply(
    `
 👋 Hi! I'm Nitin's Resume Bot

  You can explore Nitin's profile using these commands:`,
    Markup.keyboard([
      ["about", "education", "experience"],
      ["projects", "achievements", "skills"],
      ["GitHub", "Contact", "Resume"],
    ]).resize()
  );
});


bot.hears("about", (ctx) => {
  ctx.reply(`
Nitin Kumar Jha

Full-stack developer focused on backend systems, Web3, and real-time applications.

Currently building developer tools and distributed systems.
`);
});
bot.hears("GitHub", (ctx) => {
  console.log("Github called ");
    getGithubStats().then((github) => {
      ctx.reply(`GitHub Stats:
      Repositories: ${github.repos}
      Followers: ${github.followers}
      Following: ${github.following}
      Profile: ${github.profile}`);
    });
});
bot.hears("education", (ctx) => {
  ctx.reply(`
🎓 Education

B.Tech CSE — Bennett University
2023 – 2027

CGPA: 8.62
`);
});
bot.hears("experience", (ctx) => {
  ctx.reply(`
💼 Experience

Arcium — Fellow (Remote)
July 2025 – Sept 2025

• Built a system using MPC (MXE) for confidential GitHub bounty allocation  
• Designed encrypted PR evaluation mechanism  
• Integrated Solana for automated on-chain bounty payouts
`);
});
bot.hears("skills", (ctx) => {
  ctx.reply(`
⚙ Skills

Languages
C++, Python, Java, JavaScript, TypeScript, Rust, Solidity

Frameworks
React, Next.js, Node.js, Express, Tailwind, WebSockets

Databases
MongoDB, PostgreSQL, Prisma

Tools
Docker, AWS, Git, Postman, Cloudflare
`);
});
bot.hears("projects", (ctx) => {
  ctx.reply(`
🚀 Projects

1️⃣ Draft Space
Collaborative whiteboard using Next.js, Express, WebSockets
Live Link : https://canvas.nitinxdev.fun/

2️⃣ Wallet App
Full-stack digital wallet with Razorpay integration
Live Link : https://neonpay.vercel.app/

3️⃣ NadiNetra
Water monitoring dashboard using Google Earth Engine
Github : https://github.com/nitinn13/DVC-pipelining-with-GEE

Use:
/project draft
/project wallet
/project nadinetra
`);
});
bot.command("project", (ctx) => {
  const text = ctx.message.text.split(" ")[1];

  if (text === "draft") {
    ctx.reply(`
Draft Space
Live Link : https://canvas.nitinxdev.fun/

Full-stack collaborative whiteboard.

Stack:
Next.js
Express
WebSockets
PostgreSQL
Prisma

Features:
• real-time drawing
• JWT authentication
• canvas persistence
`);
  }

  if (text === "wallet") {
    ctx.reply(`
Wallet App
Live Link : https://neonpay.vercel.app/

Full-stack digital wallet with peer-to-peer transfers.

Stack:
Next.js
Node.js
Prisma
PostgreSQL
Razorpay
`);
  }

  if (text === "nadinetra") {
    ctx.reply(`
NadiNetra
Github : https://github.com/nitinn13/DVC-pipelining-with-GEE

Water quality monitoring platform.

Features:
• satellite-based water monitoring
• geospatial dashboards
• React + TypeScript analytics
`);
  }
  else {
    ctx.reply("Please specify a project: draft, wallet, or nadinetra");
  }
});
bot.hears("achievements", (ctx) => {
  ctx.reply(`
🏆 Achievements

🥈 2nd Prize — Anveshan National Round 2025

🏅 Top 10 Finalist — Microsoft Azure Hackathon (259 teams)

🚀 Presented startup idea at IIT Bombay E-Cell event at IIT Delhi
`);
});
bot.hears("Contact", (ctx) => {
  ctx.reply(`
📬 Contact

Email:
nitinjha080@gmail.com

GitHub:
https://github.com/nitinn13

Portfolio:
https://nitinxdev.fun

X:
https://x.com/nitinxjha

LinkedIn:
https://www.linkedin.com/in/nitin-kumar-jha/
`);
});

bot.hears("Resume", (ctx) => {
  ctx.replyWithDocument({ url: "https://drive.google.com/file/d/161TF8Pm9qbnRML21FJemRKjQqfKN2FZj/view" });
});
bot.hears("nitin", (ctx)=>{
  ctx.reply("Hi nitin ik it's you!")
})
bot.hears("Help", (ctx) => {
  ctx.reply(`
Available Commands

/about
/education
/experience
/skills
/projects
/project <name>
/achievements
/github
/contact
/resume
`);
});
bot.launch();

console.log("Bot running...");