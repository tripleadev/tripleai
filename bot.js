const Discord = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const client = new Discord.Client();

const config = require("./config.js");
client.config = config;

fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
	files.map(file => {
		let event = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		client.on(eventName, event.bind(null, client));
	});
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
	if (err) return console.error(err);
	console.log("[Commands] Loading...");
	files.map(file => {
		if (!file.endsWith(".js")) return;
		let props = require(`./commands/${file}`);
		console.log(`[Commands] Loaded ${file}`);
		client.commands.set(props.help.name, props);
	});
	console.log(`[Commands] Loaded ${files.length} commands!`);
});

client.login(client.config.token);
