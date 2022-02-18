const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
let db = require("quick.db")
module.exports = async(member) => {
console.log("Cezalı girdi !")
  let muterolu = ayarlar.muterolu || "818451651114303565"
  let jailrolu = ayarlar.jailrolu || "818451651114303563"
  let boostrolu = ayarlar.boosterrolu || "882890913746153483"

 let x = await  db.fetch(`Hapiste_${member.guild.name}_${member.id}`)
 let y = await  db.fetch(`Mutede_${member.guild.name}_${member.id}`)
 let z = await  db.fetch(`Sesmutede_${member.guild.name}_${member.id}`)

  if(x) {
  setTimeout(() => {
member.roles.cache.has(boostrolu) ? member.roles.set([boostrolu,jailrolu]) : member.roles.set([jailrolu])
}, 5000);
}


if(z) {
  if(member.voice.channel) member.voice.setMute(true).catch(err => console.log(err))
}

if(y) {
member.roles.add(muterolu).catch(err => console.log(err));
}
};

  