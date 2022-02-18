const Discord = require('discord.js')
const ms = require('ms')
const db = require('quick.db')
const moment = require('moment')
require ('moment-duration-format')
moment.locale('tr')

exports.run= async(client, message, args) => {

let sebep = args.slice(0).join(' ')
let veri = db.get(`afk_${message.author.id}`)
if(!sebep) sebep = "Sebep Belirtilmedi."

if(veri){
let zaman = veri.tarih
let süre = moment.duration(new Date().getTime() - zaman).format("D [gün] , H [saat] , m [dakika], s [saniye]")
message.member.setNickname(veri.isim)

let mesaj = new Discord.MessageEmbed()
.setColor("BLUE")
.setDescription(`Aramıza tekrardan hoş geldin <@!${message.author.id}>! **${süre}**'dir klavyeden **uzaktaydın.** `)
message.reply(mesaj).then(kudi => kudi.delete({timeout : 10000}))

db.delete(`afk_${message.author.id}`)
return
} else {

db.set(`afk_${message.author.id}`, {sebep : sebep , tarih: Date.now(), isim : message.member.nickname})
message.member.setNickname("[AFK] "+ message.member.nickname)

let mesaj = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`Başarıyla **${sebep}** sebebinden dolayı sisteme **AFK** olarak **kayıt edildin.**`)
message.reply(mesaj).then(kudi => kudi.delete({timeout : 10000}))
}


}
exports.conf = {
enabled : true,
guildOnly: true,
aliases: []
}

exports.help = {
name : 'afk',
}