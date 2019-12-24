const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	let online = message.guild.members.filter(
		member => member.user.presence.status !== "offline"
	);
	let day = message.guild.createdAt.getDate();
	let month = 1 + message.guild.createdAt.getMonth();
	let year = message.guild.createdAt.getFullYear();
	let icon = message.guild.iconURL;

	let server = new Discord.RichEmbed()
		.setTitle("Server Info")
		.setAuthor(message.guild.name)
		.setColor(client.config.colors.primary)
		.setTimestamp()
		.setThumbnail(icon)
		.setFooter(`Server Created • ${day}.${month}.${year}`)
		.setDescription(
			`\nOwner - \`${message.guild.owner.user.tag}\`\nRegion - \`${message.guild.region}\`\nMembers - \`${message.guild.memberCount}\`\nOnline - \`${online.size}\``
		);

	message.channel.send(server);
};

exports.help = {
	name: "server",
	description: "Get information about the server.",
	cooldown: 0,
	usage: "server"
};
