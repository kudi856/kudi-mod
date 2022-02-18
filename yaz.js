const Discord = require('discord.js');

exports.run = (client, message, args) => {

    let mesaj = args.slice(0).join(' ');
    if(!mesaj) return message.reply('Yazmam için herhangi bir şey yazmalısın.');
    if(mesaj.length > 2000) return message.reply('MAX 2000 karakter girebilirsin.');

    const embed = new Discord.MessageEmbed()
    .setColor(0xD97634)
    .setDescription(`**${mesaj}**`)
    message.channel.send(embed);

    message.delete();
};

exports.conf = {
  aliases: ['say', 'söyle']
};

exports.help = {
  name: 'yaz'
};