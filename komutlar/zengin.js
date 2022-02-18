const Discord = require("discord.js");

exports.run = async (client, message, args, ayar, emoji) => {
    let boosterrol = "934083780614963220" //boost rolü idsi
    let kanalid = "933023167650361423" //kullana bileceginiz kanal id (misal commands - bot komutlar)
    let renk = "ff66f0" //renk kafaniza göre ayarlayin suanki pembe boost rengi
    let tag = "❃" //tag sembolü varsa yazin cünkü isminin basina ekleyek olan sey yoksa bos birakin


    let onay = "<a:emoji_120:934244962084745236>" //onay emojisi id tepki icin 
    let iptal = "<a:klowraiptal1:933139824544714772>" //iptal emojisi id tepki icin
    if(!message.member.roles.cache.has(boosterrol)) return message.channel.send(`**Bu komutu kullanabilmek için Sunucuya Takviye yapmalısın!** ${iptal}`).then( a=> a.react(iptal)) 
    if(message.channel.id !== kanalid) return message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag,  message.author.avatarURL({dynamic: true}))
.setColor(renk)
    .setDescription(`**\`•\` <@${message.author.id}>, bu komutu sadece <#${kanalid}> kanalin da kullanabilirsin.**`)
.setTimestamp()
.setFooter(`© kudi Boost `, "https://cdn.discordapp.com/emojis/785950806384836619.gif?v=1%22"))
message.react(iptal);

  let boosternick = args.slice(0).join(' ')
  if(!boosternick) return message.reply("Yeni adını girmelisin.").then( a=> a.react(iptal))
  message.member.setNickname(`${tag} ${boosternick}`)
    const Savage = new Discord.MessageEmbed()
    .setAuthor(message.author.tag,  message.author.avatarURL({dynamic: true}))
    .setTimestamp()
    .setColor(renk)
    .setDescription(`**\`•\` Takma adın başarıyla \`${boosternick}\` olarak değiştirildi!**`) // tagi göstermesse embedde ${boosternick}'in basina ${tag} ekleyin yani; ${tag} ${boosternick}
    .setFooter(`© kudi Boost `, "https://cdn.discordapp.com/emojis/785950806384836619.gif?v=1%22")
    message.channel.send(Savage)
    message.react(onay);
}

exports.conf = {
    name: "zengin",
    aliases: ["booster", "zengin"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'zengin', 
    description: 'Boost basanlar isim sag tiksiz degise bilcek.',
    usage: 'kudi <isim>',
    kategori: 'kullanıcı'
};