const Discord = require("discord.js");

module.exports = (client, error) => {
	console.error;

	let ejer = client.users.get("214651290234388480");

	let embed = new Discord.RichEmbed()
		.setAuthor("An error occured!", "https://i.imgur.com/FCZNSQa.png")
		.setDescription(error)
		.setColor(client.config.colors.secondary)
		.setTimestamp();

	return ejer.send(embed);
};
