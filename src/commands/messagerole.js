const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, DiscordAPIError } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('messagerole')
		.setDescription('Manda uma mensagem privada para todos os membros com uma role.')
        .addRoleOption(option => 
			option.setName('role')
			.setDescription('Role para qual a mensagem será enviada')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
            .setDescription('Mensagem a ser enviada')
            .setRequired(true))
        .addIntegerOption(option => 
            option.setName('amount')
            .setDescription('Quantidade de vezes a enviar a mensagem.')
            .setRequired(false)),

	async execute(interaction) {
        const roleName = interaction.options.getRole('role');
        const message = interaction.options.getString('message');
        const amount = interaction.options.getInteger('amount') || 1;
        await interaction.guild.members.fetch()
        const role = interaction.guild.roles.cache.find(role => role == roleName) //the role to check
        const members = role.members // array of user IDs who have the role
        const timestamp = new Date()
        let fail = []
        for(let i = 0; i < amount; i++){
            for(const member of members){
                let messageToSend = `--------------------------------------------------------\n${member[0]} // ${timestamp.getDate()}/${timestamp.getMonth()+1} - ${timestamp.getHours()}:${timestamp.getMinutes()}\n--------------------------------------------------------\n${message}`
                const user = interaction.guild.members.cache.get(member[0]);
                await user.send(messageToSend)
                    .then()
                    .catch(error => fail.push(`${user.user.username}#${user.user.discriminator}`))
            }
        }

        fail = [...new Set(fail)]
        const sentTo = members.size - fail.length;
        
		return await interaction.reply({ 
			content: `Enviado para ${sentTo} membros -- ${amount} vezes.\nFalha ao enviar para: \n${fail.join(', ')}`, 
			ephemeral: true
		});
	},
};