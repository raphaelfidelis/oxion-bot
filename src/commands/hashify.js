const { SlashCommandBuilder } = require('@discordjs/builders');
const MD5 = require("crypto-js/md5");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hashify')
		.setDescription('Converte uma string para hash md5.')
        .addStringOption(option => 
			option.setName('hash')
			.setDescription('String a ser convertida')),

	async execute(interaction) {
        const stringToHash = interaction.options.getString('hash');
        let hashCode = MD5(stringToHash);

		return await interaction.reply({ 
			content: hashCode.toString(), 
			ephemeral: true 
		});
	},
};