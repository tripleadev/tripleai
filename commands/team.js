const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	let logo = client.user.avatarURL;
	let members = message.guild.roles
		.find(r => r.name === "Developer")
		.members.array().length;
	let mods = message.guild.roles
		.find(r => r.name === "Moderator")
		.members.array().length;

	let team = new Discord.RichEmbed()
		.setAuthor("TripleA Development")
		.setTitle("Current status of the team")
		.setColor(client.config.colors.primary)
		.setTimestamp()
		.setThumbnail(logo)
		.setDescription(
			`Team Members - \`${members}\`\nCommunity Moderators - \`${mods}\``
		);

	message.channel.send(team);
};

exports.help = {
	name: "team",
	description: "Get information about the team.",
	cooldown: 0,
	usage: "team"
};
