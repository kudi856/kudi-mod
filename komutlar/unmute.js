const Discord = require("discord.js")
const moment = require("moment")
const db = require("quick.db")
const osettings = require("../ayarlar.json")

module.exports.run = async(client,message,args) => {
const guild = message.guild;
const executor = message.member;
let oziemb = new Discord.MessageEmbed()
    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
    .setFooter("Kudi 🖤 Neşe", executor.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()

let cezarolu = osettings.mutehammer || "933023166945701894"; 
let mlog = osettings.cezalog || "937473188730925056";
let mrol = osettings.muterolu || "933023166853447785";
mlog = guild.channels.cache.get(mlog)
//
let cezarolismi = guild.roles.cache.get(cezarolu).name

if(!executor.hasPermission("ADMINISTRATOR") && !executor.roles.cache.has(cezarolu)) {
    return message.channel.send(oziemb.setDescription(`**Bu komutu kullanabilmek için ${cezarolismi} rolüne sahip olmalısınız.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
let kisi = message.mentions.members.first() || guild.members.cache.get(args[0])
if(!kisi) {
    return message.channel.send(oziemb.setDescription(`**Lütfen susturmasını açmak istediğiniz kişiyi etiketleyin veya bir ID giriniz.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
if(!kisi.roles.cache.has(mrol)) {
    return message.channel.send(oziemb.setDescription(`**Bu kişi zaten susturulu değil!**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}

kisi.roles.remove(mrol);
message.channel.send(oziemb.setDescription(`**${kisi} kullancısının susturulması başarıyla açıldı.**`).setColor("GREEN"));
mlog.send(oziemb.setDescription(`**${kisi} kullancısının susturması ${executor} tarafından başarıyla kaldırıldı.**`).setColor("GREEN"));
        db.set(`Mutede_${guild.name}_${kisi.id}`, false)
let cezano = db.fetch(`CezaNo_${guild.name}`);
for (i = cezano; i > 0; i--) {
    let ceza = db.fetch(`Ceza_${i}_${guild.name}`)
    console.log(ceza.cezalanan)
    console.log(ceza.tur)
    if(ceza.cezalanan == kisi.id && ceza.tur == "Mute"){
        db.set(`Unmute_${i}_${guild.name}`,true)
        db.set(`Ceza_${i}_${guild.name}.bitistarihi`, Date.now())

        break;
    }
  }
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["unmute","unsustur","susturmaaç"],
    permLevel: 0
  } 
  exports.help = {
    name: 'unmute',
    description: 'unmute kodu lo',
    usage: '.unmute id/@Kudi'
  }
