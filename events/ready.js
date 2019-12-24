const statuses = require("../assets/statuses.json");
const packageFile = require("../package.json");

module.exports = client => {
	console.log(`\n             TripleAI v${packageFile.version}\n`);
	console.log(
		`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`
	);
	console.log(`Logged in as ${client.user.tag} [ID: ${client.user.id}]\n`);

	client.user.setStatus("available");
	client.user.setPresence({
		game: {
			name: "myself boot up.",
			type: "WATCHING"
		}
	});

	let i = 0;
	setInterval(function() {
		if (i > statuses.length - 1) i = 0;
		client.user.setPresence({
			game: {
				name: statuses[i],
				type: "WATCHING"
			}
		});
		i++;
	}, 60000);
};
