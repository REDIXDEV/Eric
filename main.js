const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
//const YTDL = require("ytdl-core")
const adapter = new FileSync('database.json')
const storeadapter = new FileSync('store.json')
const db = low(adapter);
const storedb = low(storeadapter);
const PREFIX = "!";
var bot = new Discord.Client();
var prefix = ("!");
//var servers = {};

db.defaults({ xp: [], inventory: []})
    .write()

bot.on("ready", () => {
    bot.user.setGame("Bot join-leave");
    console.log("BOT READY");
});
bot.login("NDU2ODk5MTgwNTMxODEwMzE0.DgTsJw.ZVAweOXe4ikdXNCen3esok3xj7Q");
//join
bot.on("guildMemberAdd", member => {
    //let role = member.guild.roles.find("name", "testeur");
    member.guild.channels.find("name", "join-leave").send(`:hamburger: ${member.user.username} vien de rejoindre le serveur !`)
    //member.addRole(role)
})
//leave
bot.on("guildMemberRemove", member => {
    member.guild.channels.find("name", "join-leave").send(`:taco: ${member.user.username} vien de quitter le serveur !`)
})

bot.on("message", message => {
    //if (message.content.startsWith(prefix + commande)){
    var msg = message.content 
    let commande = msg.split(" ")[0]
    let args = msg.slice(prefix.length).split(/ +/) 
    commande = args.shift().toLowerCase()
    if(commande === `channel`) {
        try {
            // Embed
             let mentionEmbed = new Discord.RichEmbed()
             .setDescription('**Please mention a channel**\n **>** *!settings set channel #channel*')
            // Return Statements
             if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(ownerEmbed, 120000) // This returns if it CANT find the admin perm on them. It then uses the function to send to message.channel, and deletes the message after 120000 milliseconds (2minutes)
             //if (!args[2]) return message.channel.send(`You Input A Message! Refer To \`!settings help\``)
             if (!args.slice(2, 1000, args[2]).join(' ') === 'NONE') return message.channel.send(mentionEmbed) // This returns if they don't message a channel, but we also want it to continue running if they want to disable the log
        
            // Fetch the new channel they mentioned
             let newChannel = ''
             const errorReport = bot.channels.get(`453597878888300544`)
             if (args.slice(2, 1000, args[2]).join(' ') === 'NONE') newMessage = '' // If they wrote the word none, it sets newMessage as empty.
             else newMessage = args.slice(2, 1000, args[2]).join(' ') // If they didn't write none, set what they wrote as the message
             if(`${message.mentions.channels.first()}` == `undefined`) return
             let channelEmbed = new Discord.RichEmbed()
             .setDescription(`**Successfully updated logging channel to ${message.mentions.channels.first()}**`)
        
            // Update Channel
             db.set(`pmessageChannel_${message.guild.id}`, `${message.mentions.channels.first().id}`).then(i => {
                message.channel.send(channelEmbed) // Finally, send in chat that they updated the channel.
             })
        }catch(err) {console.log(`Error with setting channel\n${err}`)}
    }
    if (commande === "google") {
    let google = args.slice(0).join('+');
    let link = `https://www.google.com/search?q=` + google;
    if(!link)return message.reply("Console error")
    let embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .addField('Action:', 'Searching on Google')
	    .addField("Word:", `${args.slice(0).join(' ')}`)
     	.addField('Link:', `${link}`)
    	.setFooter("You're avatar", message.author.avatarURL)
	message.channel.send(embed);
	message.author.send(`You have searched for ${link} in ${ message.guild.name}`);
    }
});

//bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    if (!message.content.startsWith(PREFIX)) return;
    var args = message.content.substring(PREFIX.length).split(" ");
    //switch (args[0].toLowerCase()){
    switch(args[0]){
    case 'p': //setting activity to "playing"
    if(message.author.id != '176713632623624193')//return message.channel.send('You cant do that')
    bot.user.setActivity(args.splice(1).join(' '), {type: 'playing'});
    message.channel.send('**Playing** status ready');
    break;
    case 'w': //setting activity to "watching"
    if(message.author.id != '176713632623624193')//return message.channel.send('You cant do that')
    bot.user.setActivity(args.splice(1).join(' '), {type: 'watching'});
    message.channel.send('**Wathcing** status ready')
    break;
    case 'l': //setting activity to "listening"
    if(message.author.id != '176713632623624193')//return message.channel.send('You cant do that')
    bot.user.setActivity(args.splice(1).join(' '), {type: 'listening'});
    message.channel.send('**Listening** status ready');
    break;
}
});