const Discord = require("discord.js");

module.exports = (client, member) => {
	let channel = member.guild.channels.find(c => c.name === "welcome");
	let role = member.guild.roles.find(r => r.name === "Member");

	let embed = new Discord.RichEmbed()
		.setColor(client.config.colors.primary)
		.setAuthor("TripleA Development", client.user.avatarURL)
		.setDescription(
			`Welcome ${member} to the official TripleA Development Discord server!`
		)
		.setThumbnail(member.user.avatarURL)
		.setTimestamp();

	channel.send(embed);
	member.addRole(role);
};
