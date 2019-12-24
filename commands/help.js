const Discord = require("discord.js");

exports.run = (client, message, args) => {
	let staff = message.guild.roles.find(r => r.name === "Moderator");

	if (!args[0]) {
		let embed = new Discord.RichEmbed()
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor(client.config.colors.primary)
			.setDescription(`I've sent the help menu to your DMs!`);

		let help1 = new Discord.RichEmbed()
			.setAuthor(client.user.username, client.user.avatarURL)
			.setTitle("About")
			.setColor(client.config.colors.primary)
			.setDescription(
				`Welcome to the TripleAI bot, a virtual automated helper created by ejer to help manage and assist the users of the official TripleA Development Discord Server.\n\n[Permanent Server Invite](http://triplea.gq/discord)`
			);

		let help2 = new Discord.RichEmbed()
			.setTitle("Commands")
			.setColor(client.config.colors.primary);

		if (!message.member.roles.has(staff.id))
			help2.setDescription(
				`Type \`${client.config.prefix}help [command]\` to get information about a command.\n\n` +
					client.commands
						.filter(cmd => !cmd.help.staff)
						.map(cmd => `\`${cmd.help.name}\` - ${cmd.help.description}`)
						.join("\n")
			);
		else
			help2.setDescription(
				`Type \`${client.config.prefix}help [command]\` to get information about a command.\n\n` +
					client.commands
						.map(cmd => `\`${cmd.help.name}\` - ${cmd.help.description}`)
						.join("\n")
			);

		return message.author
			.send(help1)
			.then(() =>
				message.author.send(help2).then(() => message.channel.send(embed))
			)
			.catch(() => {
				let error = new Discord.RichEmbed()
					.setAuthor("An error occurred!", "https://i.imgur.com/FCZNSQa.png")
					.setDescription("Could not send a DM!")
					.setColor(client.config.colors.secondary)
					.setTimestamp();

				return message.channel.send(error);
			});
	} else if (args[0]) {
		let command = client.commands.get(args[0]);
		if (!command) return message.reply("Please enter a valid command!");

		let props = require(`./${args[0]}.js`);

		if (!message.member.roles.has(staff.id) && props.help.staff)
			return message.reply("Please enter a valid command!");

		let embed = new Discord.RichEmbed()
			.setTitle(`Command`)
			.setColor(client.config.colors.primary)
			.setDescription(
				`**Name:** ${props.help.name}\n**Description:** ${props.help.description}\n**Cooldown:** ${props.help.cooldown} seconds\n**Usage:** ${client.config.prefix}${props.help.usage}`
			);

		message.channel.send(embed);
	}
};

exports.help = {
	name: "help",
	description: "Display the help menu or get information about a command.",
	cooldown: 0,
	usage: "help [command]"
};
