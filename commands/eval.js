const Discord = require("discord.js");

const clean = text => {
	if (typeof text === "string")
		return text
			.replace(/`/g, "`" + String.fromCharCode(8203))
			.replace(/@/g, "@" + String.fromCharCode(8203));
	else return text;
};

exports.run = (client, message, args) => {
	if (message.author.id === "214651290234388480") {
		try {
			const code = args.join(" ");
			if (!code) return message.reply("Please input some code to eval!");
			if (
				code.includes("client.token") ||
				code.includes("client.config.token") ||
				code.includes("process.env.TOKEN")
			)
				return message.reply("Not giving my token away that easily!");

			let evaled = eval(code);

			if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

			let embed = new Discord.RichEmbed()
				.setColor(client.config.colors.primary)
				.setTitle(":printer: Eval")
				.setTimestamp()
				.setFooter(`Executed by ${message.author.tag}`)
				.addField("📥 Input", "```js\n" + code + "```", false)
				.addField("📤 Output", "```js\n" + clean(evaled) + "```", false);

			message.channel.send(embed);
		} catch (err) {
			const code = args.join(" ");
			let embed = new Discord.RichEmbed()
				.setColor(client.config.colors.secondary)
				.setTitle(":printer: Eval Error!")
				.setTimestamp()
				.setFooter(`Executed by ${message.author.tag}`)
				.addField("📥 Input", "```js\n" + code + "```", false)
				.addField("📤 Error", "```js\n" + clean(err) + "```", false);

			message.channel.send(embed);
		}
	} else {
		return;
	}
};

exports.help = {
	name: "eval",
	description: "Evaluate javascript code.",
	cooldown: 0,
	usage: "eval",
	staff: true
};
