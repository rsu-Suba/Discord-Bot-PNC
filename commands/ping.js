//6-10-2023

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pongを返します'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
