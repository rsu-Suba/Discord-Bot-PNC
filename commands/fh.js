//9-1-2023

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
let searchnum = 0;
let setnum = 0;
let cachei = 0;
let count = 1;
let start;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fh')
		.setDescription('他のユーザーからは見えない素因数分解を行います')
    .addNumberOption(option =>
      option
        .setName('値')
        .setDescription('分解する値を入力')
        .setRequired(true)
      ),
	async execute(interaction) {
    const inputForm = interaction.options.getNumber('値');
    if (inputForm == null){
		  await interaction.reply({content:`値が入力されていないため終了します`, ephemeral: true});
    }
    else{
      start = performance.now();
      setnum = inputForm;
      result = `[${inputForm}]\n`;
      cachei = 0;
      count = 1;
      divide(inputForm);
		  await interaction.reply({content:`${result}`, ephemeral: true});
    }
  },
};

function divide(searchnum){
    if (searchnum < 2){
        result = `1以下が入力されたため終了します。`;
        return;
    }
    for(let i = 2;;i++){
        if (i > 2 && i % 2 == 0){
            continue;
        }
        if (i > Math.sqrt(searchnum)){
            if (searchnum == setnum){
                result += `\n${setnum}は素数\n`;
            }
            if (cachei == searchnum){
                count++;
                result += `^${count}\n`;
            }
            else if (searchnum != setnum){
                if (count > 1){
                    result += `^${count}`;
                }
                result += `\n${searchnum}\n`;
            }
            const end = performance.now();
            result += `\nFinish (${(Math.round((end - start) * 100) / 100)}ms)`;
            return result
        }
        if (searchnum % i == 0){
            if (cachei == i){
                count++;
            }
            else{
                if (count > 1){
                    result += `^${count}`;
                }
                cachei = i;
                count = 1;
                result += `\n${i}`;
            }
            divide(searchnum / i);
          return result;
        }
    }
}