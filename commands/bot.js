const Discord = require("discord.js");

const packageFile = require("../package.json");

exports.run = async (client, message, args) => {
	let ping = new Date() - message.createdAt;

	let totalSeconds = process.uptime();
	let realTotalSecs = Math.floor(totalSeconds % 60);
	let days = Math.floor((totalSeconds % 31536000) / 86400);
	let hours = Math.floor((totalSeconds / 3600) % 24);
	let mins = Math.floor((totalSeconds / 60) % 60);
	let used = process.memoryUsage().heapUsed / 1024 / 1024;

	let bot = new Discord.RichEmbed()
		.setTitle("Bot Info")
		.setAuthor(client.user.username)
		.setColor(client.config.colors.primary)
		.setTimestamp()
		.setThumbnail(client.user.avatarURL)
		.setDescription(
			`\nCreator - \`ejer#9484\`\nPrefix - \`${
				client.config.prefix
			}\`\nVersion - \`v${packageFile.version}\`\nCommands - \`${
				client.commands.array().length
			}\`\nUptime - \`Days: ${days} | Hours: ${hours} | Minutes: ${mins} | Seconds: ${realTotalSecs}\`\nMemory Usage - \`${Math.round(
				used * 100
			) / 100}MB\`\nNode Version - \`${
				process.version
			}\`\nLatency - \`${Math.floor(ping)}ms\`\nAPI Ping - \`${Math.floor(
				client.ping
			)}ms\``
		);

	message.channel.send(bot);
};

exports.help = {
	name: "bot",
	description: "Get information about the bot.",
	cooldown: 0,
	usage: "bot"
};
