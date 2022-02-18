exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return 
  const silinecekmiktar = args.slice(0).join('');
if(silinecekmiktar .length < 1) { return message.reply("Silinecek mesaj miktarını belirt") } 
  message.channel.bulkDelete(silinecekmiktar );
message.channel.send("Toplam " + silinecekmiktar + " mesaj sildim").then(message => {
	message.delete({timeout: 5000})
});
}

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["clear", "sil"],
  permLevel: 0 
};

exports.help = {
  name: 'temizle', 
  description: 'girdiğin sayı kadar mesaj siler',
  usage: 'temizle '
};