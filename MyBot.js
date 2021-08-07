require("./Client.js");
const fs = require("fs");

const Discord = require("discord.js");
const { prefix } = require("./config.json");

const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

// const client = new Discord.Client();
// client.commands = new Discord.Collection();

// const commandFiles = fs
//   .readdirSync("./commands")
//   .filter((file) => file.endsWith(".js"));

// for (const file of commandFiles) {
//   const command = require(`./commands/${file}`);
//   client.commands.set(command.name, command);
// }

// client.once("ready", async () => {
//   console.log("Ready!");

//   try {
//     const channel = client.channels.cache.get("870058177251647539");
//     const webhooks = await channel.fetchWebhooks();
//     const webhook = webhooks.first();
//     // console.log(webhooks);

//     // await webhook.send("Webhook test", {
//     //   username: "some-username",
//     //   avatarURL: "https://i.imgur.com/wSTFkRM.png",
//     //   // embeds: [embed],
//     // });
//   } catch (error) {
//     console.error("Error trying to send: ", error);
//   }
// });

// client.once("reconnecting", () => {
//   console.log("Reconnecting!");
// });

// client.once("disconnect", () => {
//   console.log("Disconnect!");
// });

// client.on("message", (message) => {
//   if (!message.content.startsWith(prefix) || message.author.bot) return;
//   if (message.channel.name !== "bot") {
//     message.channel.send(
//       `${message.author}, you're only allowed to send messages inside **# bot** channel.`
//     );
//     return;
//   }

//   const args = message.content.slice(prefix.length).trim().split(/ +/);
//   const command = args.shift().toLowerCase();

//   if (!client.commands.has(command)) return;

//   try {
//     client.commands.get(command).execute(message, args);
//     return;
//   } catch (error) {
//     message.reply(error);
//     message.reply(
//       `there was an error trying to execute command: '${command}'!`
//     );
//   }
// });

const port = process.env.PORT || 8080;

// app.set("view engine", "html");
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
app.listen(port, () => {
  console.log("App up!");
});

// client.login(process.env.DISCORD_TOKEN);
