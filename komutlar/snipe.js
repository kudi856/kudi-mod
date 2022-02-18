const Discord = require('discord.js')
const moment = require('moment')
const db = require('quick.db')
require ('moment-duration-format')
moment.locale('tr')

exports.run= async(client, message, args) => {

let mesaj = db.get(`mesaj_${message.channel.id}`)
if(!mesaj) {
let embed = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(`Bu kanalda **son silinen mesajı bulamadım.**`)
message.reply(embed).then(msg => { msg.delete({ timeout: 15000}) })
} else {

let zaman = mesaj.tarih
let süre = moment.duration(new Date().getTime() - zaman).format("D [gün] , H [saat] , m [dakika], s [saniye]")
    
let embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setThumbnail(client.users.cache.get(mesaj.kullanıcı).displayAvatarURL({dynamic: true}))
.setDescription(`**Son silinen mesaj bilgileri verilmiştir.**

- Mesaj Sahibi : <@!${mesaj.kullanıcı}> [**${message.guild.members.cache.get(mesaj.kullanıcı).nickname || client.users.cache.get(mesaj.kullanıcı).tag }**]
- Mesaj Sahibi İD : **${mesaj.kullanıcı}**

- Slinen Mesaj : **${mesaj.mesaj}**

Mesaj **${süre}** önce silinmiştir.
`)
message.reply(embed).then(msg => { msg.delete({ timeout: 30000}) })
}

}
exports.conf = {
enabled : true,
guildOnly: true,
aliases: []
}

exports.help = {
name : 'snipe',
}