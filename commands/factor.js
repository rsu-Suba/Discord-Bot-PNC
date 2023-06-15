const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('factor')
		.setDescription('素因数分解'),
	async execute(interaction) {
		const filter = response => {
			return interaction.user.id == response.author.id;
		};
		interaction.reply({ content: "分解する値を送信してください。", fetchReply: true })
			.then(() => {
				interaction.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
					.then(collected => {
						let num = collected.first().content;
						let result = "";
            result = search(num);
            result += '\n\nFinish';
						interaction.followUp(`${result}`);
					})
					.catch(collected => {
						interaction.followUp(`値が送信されなかったため終了します`);
					});
			});
	},
};

var i = 0;
var searchnum = 0;
var halfnum = 0;
var rem = 0;
var isPrime = 0;
var result = '';
var cachei = 0;
var cachenum = 0;
var isEnd = 0;

function search(num){
  result = '['+num+']\n\n';
halfnum = num / 2;
  isEnd = 0;
  isPrime = 0;
  if (num < 1){
    return '1以上が送信されなかったため終了します。'
  }
   if (num == 1 || num == 2){
     return num+'は素数';
   }
  for (i = 2;i <= halfnum;i++){
    cachei = i;
    rem = num % cachei;
    if(rem == 0){
      result += cachei;
      isPrime = 1;
      cachenum = num;
      if (isEnd == 0){
      search2(num / cachei);
      }
    }
    else{
      continue;
    }
  }
  if(isPrime == 0){
    result = num + 'は素数';
    return result;
  }
  else if (isPrime == 1){
    return result;
  }
}

function search2(spnum){
halfnum = spnum / 2;
  for (i = 2;i <= spnum;i++){
    if (i > 2 && (i % 2) == 0){
	    continue;
    }
    if (halfnum < i){
      isEnd = 1;
      result += '\n' + spnum;
      break;
    }
    cachei = i;
    rem = spnum % cachei;
    if(rem == 0){
      result += '\n' + cachei;
      search2(spnum / cachei);
      break;
    }
    else{
      continue;
    }
  }
}
