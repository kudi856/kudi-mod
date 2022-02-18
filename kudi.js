const Discord = require('discord.js');
const client = new Discord.Client({fetchAllMembers: true});
const ayarlar = require('./ayarlar.json');
const { Client, Util } = require('discord.js');
const fs = require('fs');
let moment = require('moment')
    moment.locale('tr')
    require('moment-duration-format')

global.client = client;
require('./util/eventLoader')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    console.log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        console.log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};


client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.yetkihesapla = message => {
    if (!message.guild) {
        return;
    }
    let yetkiseviyesi = 0;
    if (message.member.hasPermission("MANAGE_MESSAGES")) yetkiseviyesi = 1;
    if (message.member.hasPermission("BAN_MEMBERS")) yetkiseviyesi = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) yetkiseviyesi = 3;
    if (message.author.id === ayarlar.sahip) yetkiseviyesi = 4;
    return yetkiseviyesi;
};

const db = require('quick.db');

client.on("ready", async () => {
    client.channels.cache.get("933023167507742721").join();

  });


client.login(ayarlar.token).then(console.log(`Giriş Başarılı! Bot aktif.`)).catch(err => console.log(err))

client.on("message", msg => {
    if(!db.has(`reklam_${msg.guild.id}`)) return;
           const reklam = [".com", ".net", ".tk", ".xyz", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
           if (reklam.some(word => msg.content.includes(word))) {
             try {
               if (!msg.member.hasPermission("BAN_MEMBERS")) {
                     msg.delete();
                       return msg.reply('**Reklam yapman yasak lütfen reklam yapmamaya dikkat et !**').then(msg => msg.delete(5000));                            
    
               }              
             } catch(err) {
               console.log(err);
             }
           }
       });


       

    const { CronJob } = require("cron");
    const Job = new CronJob(
      "00 00 8 * * *",
      function() {
        client.channels.cache
          .get( "933023167650361422")
          .send(
            "`>` Günaydınlarrr \n`>` Gününüz aydın olması dilegiyle seviliyorsunuz"
          );
      },
      null,
      true,
      "Europe/Istanbul"
    );
    Job.start();
    
    const Jobb = new CronJob(
      "00 00 23 * * *",
      function() {
        client.channels.cache
          .get( "933023167650361422")
          .send(
            `**───────────────────────────────────────**\n\`>\` Bugün de bitti, yeni gününüz sevdiklerinizle mutlu geçsin!\n\`>\`  Şunu asla unutmayın ki seviliyorsunuz ve değerlisiniz. İyi geceler!\n**───────────────────────────────────────**\n**[00.00]** `
          );
      },
      null,
      true,
      "Europe/Istanbul"
    );
    Jobb.start();

   
    const { DiscordAPIError } = require("discord.js");


client.on("message", message => {
  if(message.content.toLowerCase() == "!tag") 
  return message.channel.send(`❃, 0066`)
});

client.on("message", message => {
  if(message.content.toLowerCase() == "tag") 
  return message.channel.send(`❃, 0066`)
});

client.on("message", message => {
  if(message.content.toLowerCase() == ".tag") 
  return message.channel.send(`❃, 0066`)
});

client.on("message", message => {
  if(message.content.toLowerCase() == "-tag") 
  return message.channel.send(`❃, 0066`)
});

client.on("message", message => {
  if(message.content.toLowerCase() == "?tag") 
  return message.channel.send(`❃, 0066`)
});

client.on("message", message => {
  if(message.content.toLowerCase() == "*tag") 
  return message.channel.send(`❃, 0066`)
});


Date.prototype.toTurkishFormatDate = function (format) {
  let date = this,
    day = date.getDate(),
    weekDay = date.getDay(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
  let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");

  if (!format) {
    format = "dd MM yyyy | hh:ii:ss";
  };
  format = format.replace("mm", month.toString().padStart(2, "0"));
  format = format.replace("MM", monthNames[month]);
  
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  };
  
  format = format.replace("dd", day.toString().padStart(2, "0"));
  format = format.replace("DD", dayNames[weekDay]);

  if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("hh") > -1) {
    if (hours > 24) hours -= 24;
    if (hours === 0) hours = 24;
    format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
  };
  if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
  return format;
};


/////////////////////// AFK KOMUTU BAŞLANGIÇ ////////////////////////

client.on("message", message => {

if(!message.guild) return
if(message.author.bot) return

let user = message.mentions.users.first()
if(!user) return

let veri = db.get(`afk_${user.id}`)
if(!veri) return

let zaman = veri.tarih 
let süre = moment.duration(new Date().getTime() - zaman).format("D [gün] , H [saat] , m [dakika], s [saniye]")

let mesaj = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(`Hey <@!${message.author.id}>! Etiketlediğin ${user} isimli kullanıcı **${süre}**'dir **${veri.sebep}** sebebinden dolayı **klavyeden uzakta!**`)
message.reply(mesaj).then(kudi => kudi.delete({timeout : 10000}))
})

client.on("message", message => {

if(!message.guild) return
if(message.author.bot) return
  
if(message.content.startsWith(ayarlar.prefix + "afk")) return

let veri = db.get(`afk_${message.author.id}`)
if(!veri) return
  
let zaman = veri.tarih 
let süre = moment.duration(new Date().getTime() - zaman).format("D [gün] , H [saat] , m [dakika], s [saniye]")
  
message.member.setNickname(veri.isim)

let mesaj = new Discord.MessageEmbed()
.setColor("BLUE")
.setDescription(`Aramıza tekrardan hoş geldin <@!${message.author.id}>! **${süre}**'dir klavyeden **uzaktaydın.**`)
message.reply(mesaj).then(kudi => kudi.delete({timeout : 20000}))
db.delete(`afk_${message.author.id}`)
})

/////////////////////// AFK KOMUTU BİTİŞ ////////////////////////

/////////////////////// SNİPE KODU BAŞLANGIÇ ////////////////////
client.on("messageDelete", message => {

if(message.author.bot) return
if(message.channel.type === "dm") return

db.set(`mesaj_${message.channel.id}`,{ mesaj : message.content , kullanıcı: message.author.id , tarih : Date.now()})
}) 

/////////////////////// SNİPE KODU BİTİŞ ////////////////////