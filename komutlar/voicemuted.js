const Discord = require("discord.js")
const moment = require("moment")
const db = require("quick.db")
const osettings = require("../ayarlar.json")
const ms = require("ms")
module.exports.run = async(client,message,args) => {
const guild = message.member.guild
let executor = message.member

let mlog = await message.guild.channels.cache.get(osettings.cezalog) || message.guild.channels.cache.get("937479456002564156") 
let cezarolu = osettings.mutehammer || "933023166945701894"
let cezarolismi = message.guild.roles.cache.get(cezarolu)

let oziemb = new Discord.MessageEmbed()
    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
    .setFooter("Kudi 🖤 Neşe", executor.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()


if(!executor.hasPermission("ADMINISTRATOR") && !executor.roles.cache.has(cezarolu)) {
    return message.channel.send(oziemb.setDescription(`**Bu komutu kullanabilmek için ${cezarolismi} rolüne sahip olmalısınız.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
let cezalandirilicak = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!cezalandirilicak) {
    return message.channel.send(oziemb.setDescription(`**Lütfen geçerli birini etiketleyiniz veya geçerli bir ID giriniz.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
if(executor.roles.highest.position <= cezalandirilicak.roles.highest.position) {
    return message.channel.send(oziemb.setDescription(`**Kendinden üst yetkide birini susturamazsın!**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
let zaman = args[1] 
let sahtezaman = zaman;

let sebep = args.splice(2).join(" ") || false; 

if(!zaman || !sebep) {
    return message.channel.send(oziemb.setDescription(`**Lütfen doğru biçimde zaman ve sebep belirtin. Örnek: \`mute @Kudi 1sn/1dk/1sa/1g küfür\`.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}

zaman = zaman.replace("sn","s").replace("dk","m").replace("sa","h").replace("g","d");
zaman = zaman.replace("saniye","s").replace("dakika","m").replace("saat","h").replace("gün","d");
if(!ms(zaman)) {
    return message.channel.send(oziemb.setDescription(`**Lütfen doğru biçimde zaman ve sebep belirtin. Örnek: \`mute @kudi 1sn/1dk/1sa/1g küfür\`.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
let cezano = db.fetch(`CezaNo_${guild.name}`) + 1;

if(cezalandirilicak.voice.channel) cezalandirilicak.voice.setMute(true).catch(err => console.log(err))
cezalandirilicak.roles.add('933023166853447783')
cezalandirilicak.roles.add('933023166853447783')
setTimeout(() => {
    
    if(cezalandirilicak.voice.channel) cezalandirilicak.voice.setMute(false).catch(err => console.log(err))
    cezalandirilicak.roles.remove('933023166853447783')
    cezalandirilicak.roles.remove('933023166853447783')
    let y = db.fetch(`UnSesmute_${cezano}_${guild.name}`)
    if(!y){
    cezano = db.fetch(`CezaNo_${guild.name}`)
    db.set(`Sesmutede_${guild.name}_${cezalandirilicak.id}`, false)
    for (i = cezano; i > 0; i--) {
        let ceza = db.fetch(`Ceza_${i}_${guild.name}`)
        if(ceza.cezalanan == cezalandirilicak.id && ceza.tur == "SesMute"){
            db.set(`Ceza_${i}_${guild.name}.bitistarihi`, Date.now())    
            break;
        }
      }

    }   
}, ms(zaman))

db.add(`CezaNo_${guild.name}`, 1)
db.set(`Sesmutede_${guild.name}_${cezalandirilicak.id}`, true)

mlog.send(oziemb.setColor("RED").setDescription(`**${cezalandirilicak} ses kanallarında susturuldu!\n\n● Susturan Yetkili: ${executor}\n● Süre: ${sahtezaman}\n● Sebep: ${sebep}\n● CezaNo: \`${cezano}\`**`))
message.channel.send(oziemb.setColor("#FF00FF").setDescription(`**${cezalandirilicak}, ${executor} tarafından ${sebep} sebebiyle ${sahtezaman} boyunca ses kanallarında susturuldu!**`))


let ceza = {
    no: cezano,
    tur: "SesMute", 
    sebep: sebep,
    baslamatarihi: Date.now(),
    bitistarihi:  "Hala Susturulu",
    cezalandiran: executor.id,
    cezalanan: cezalandirilicak.id
}
db.set(`Ceza_${cezano}_${guild.name}`, ceza)
db.add(`SesMute_${cezalandirilicak.id}`,1)

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["seslisustur","voicemute","seskapat"],
    permLevel: 0
} 
exports.help = {
  name: 'vmute',
  description: 'mute kodu lo',
  usage: '.mute id/@Kudi 1sn/1dk/1sa/1g sebep'
}
