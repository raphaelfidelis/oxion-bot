const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kanye')
		.setDescription('Diz algo que meu mano Kanye West já tenha dito.'),

	async execute(interaction) {
        const kanyeRequest = await fetch('https://api.kanye.rest')
          .then(res => res.json());

		return await interaction.reply({ 
			content: `\"${kanyeRequest.quote}\"\n -- Kanye West`, 
			ephemeral: true 
		});
	},
};