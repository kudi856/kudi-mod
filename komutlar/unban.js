const Discord = require("discord.js")
const moment = require("moment")
const db = require("quick.db")
const osettings = require("../ayarlar.json")

module.exports.run = async(client,message,args) => {
const guild = message.guild;
const executor = message.member;
moment.locale("tr") 
let oziemb = new Discord.MessageEmbed()
    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
    .setFooter("Kudi 🖤 Neşe", executor.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()

let cezarolu = osettings.banhammer || "933023166945701896"; 
let ublog = osettings.cezalog || "937473188730925056";
ublog = guild.channels.cache.get(ublog)
//
let cezarolismi = guild.roles.cache.get(cezarolu).name
//

if(!executor.hasPermission("ADMINISTRATOR") && !executor.roles.cache.has(cezarolu)) {
    return message.channel.send(oziemb.setDescription(`**Bu komutu kullanabilmek için ${cezarolismi} rolüne sahip olmalısınız.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}

if(!args[0]) {
    return message.channel.send(oziemb.setDescription(`**Lütfen affedilecek kişi için geçerli bir ID giriniz.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
let sorguid = args[0]
let kisi = await client.users.fetch(sorguid)

try {
    guild.members.unban(sorguid)
} catch (err) {
    console.log(err)
    return message.channel.send(oziemb.setDescription(`**Aratılan ID'de ${guild.name} sunucusunda yasaklı birini bulamadım.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
let tarih = moment(message.createdAt).format("lll")
message.channel.send(oziemb.setDescription(`**${kisi} kullancısının yasaklaması başarıyla kaldırıldı.**`).setColor("GREEN"));
ublog.send(oziemb.setDescription(`**${kisi} kullancısının yasaklaması ${executor} tarafından başarıyla kaldırıldı.**`).setColor("GREEN"));
let cezano = db.fetch(`CezaNo_${guild.name}`);
for (i = cezano; i > 0; i--) {
    let ceza = db.fetch(`Ceza_${i}_${guild.name}`)
    if(ceza.cezalanan == sorguid && ceza.tur == "Ban"){
        db.set(`Ceza_${i}_${guild.name}.bitistarihi`, Date.now())
        break;
    }
  }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["affet","banac","banaç"],
    permLevel: 0
  } 
  exports.help = {
    name: 'unban',
    description: 'unban kodu lo',
    usage: '.unban id/@kudi'
  }