const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

var timestamp = Date.now();

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("How Renz on YT", {type: "WATCHING"});

  //bot.user.setGame("on SourceCade!");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){

    //!kick @daeshan askin for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No cant do it pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
         .setAuthor("Alliance MGUI")
    .setDescription("Kicked")
    .setColor("#00FFFF")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason)
    .setFooter("Alliance MGUI", "https://images-ext-2.discordapp.net/external/CG27bf2Z3NWEsRzJKw395DV6uSrhORuv3doYwvhDEmY/https/cdn.discordapp.com/icons/516766583708712960/003eaba26c391c3d154787e9df070906.jpg?width=80&height=80")
    .setTimestamp(timestamp);

    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("Can't find incidents channel.");

    message.delete().catch(O_o=>{});
    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No cant do it pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
         .setAuthor("Alliance MGUI")
    .setDescription("Banned")
    .setColor("#00FFFF")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason)
    .setFooter("Alliance MGUI", "https://images-ext-2.discordapp.net/external/CG27bf2Z3NWEsRzJKw395DV6uSrhORuv3doYwvhDEmY/https/cdn.discordapp.com/icons/516766583708712960/003eaba26c391c3d154787e9df070906.jpg?width=80&height=80")
    .setTimestamp(timestamp);

    let incidentchannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

    message.delete().catch(O_o=>{});
    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
  }


  if(cmd === `${prefix}report`){

    //!report @ned this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
         .setAuthor("Alliance MGUI")
    .setDescription("Reports")
    .setColor("#00FFFF")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason).setFooter("Alliance MGUI", "https://images-ext-2.discordapp.net/external/CG27bf2Z3NWEsRzJKw395DV6uSrhORuv3doYwvhDEmY/https/cdn.discordapp.com/icons/516766583708712960/003eaba26c391c3d154787e9df070906.jpg?width=80&height=80")
    .setTimestamp(timestamp);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }




  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
         .setAuthor("Alliance MGUI")
    .setDescription("Server Information")
    .setColor("#00FFFF")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount)
    .setFooter("Alliance MGUI", "https://images-ext-2.discordapp.net/external/CG27bf2Z3NWEsRzJKw395DV6uSrhORuv3doYwvhDEmY/https/cdn.discordapp.com/icons/516766583708712960/003eaba26c391c3d154787e9df070906.jpg?width=80&height=80")
    .setTimestamp(timestamp);

    message.delete().catch(O_o=>{});
    return message.channel.send(serverembed);
  }



  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
         .setAuthor("Alliance MGUI")
    .setDescription("Bot Information")
    .setColor("#00FFFF")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .setFooter("Alliance MGUI", "https://images-ext-2.discordapp.net/external/CG27bf2Z3NWEsRzJKw395DV6uSrhORuv3doYwvhDEmY/https/cdn.discordapp.com/icons/516766583708712960/003eaba26c391c3d154787e9df070906.jpg?width=80&height=80")
    .setTimestamp(timestamp);

    message.delete().catch(O_o=>{});
    return message.channel.send(botembed);
  }



  if(cmd === `${prefix}help`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
     .setAuthor("Alliance MGUI")
     .setDescription("Help Information")
    .setColor("#00FFFF ")
    .setThumbnail(bicon)
    .addField("Kick players", "Use !kick then select user")
    .addField("Report players", "Use !report then select user")
    .addField("Banned players", "Use !ban then select user")
     .addField("Server Info", "Use !serverinfo")
      .addField("Bot Info", "Use !botinfo")
        .addField("Whitelist Game", "Use !whitelist then your game Id")
      .setFooter("Alliance MGUI", "https://images-ext-2.discordapp.net/external/CG27bf2Z3NWEsRzJKw395DV6uSrhORuv3doYwvhDEmY/https/cdn.discordapp.com/icons/516766583708712960/003eaba26c391c3d154787e9df070906.jpg?width=80&height=80")
    .setTimestamp(timestamp);

    message.delete().catch(O_o=>{});
    return message.channel.send(botembed);
  }






 if(cmd === `${prefix}clear`){

   //!clear 15

    let clearembed = new Discord.RichEmbed()
     .setAuthor("Alliance MGUI")
     .setDescription("Clear Message Command")
    .setColor("#00FFFF ")
    .addField("Success !", `Cleared ${args[0]} messages.`)
    .setFooter("Alliance MGUI", "https://images-ext-2.discordapp.net/external/CG27bf2Z3NWEsRzJKw395DV6uSrhORuv3doYwvhDEmY/https/cdn.discordapp.com/icons/516766583708712960/003eaba26c391c3d154787e9df070906.jpg?width=80&height=80")
    .setTimestamp(timestamp);

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("oof.");
  if(!args[0]) return message.channel.send("oof");
  message.channel.bulkDelete(args[0]).then(() => {

  
    (msg => msg.delete(5000));
    message.delete().catch(O_o=>{});
    return message.channel.send(clearembed);
  });
}






 if(cmd === `${prefix}addrole`){

 let addroleembed = new Discord.RichEmbed()
     .setAuthor("Alliance MGUI")
     .setDescription("Add role Command")
    .setColor("#00FFFF ")
    .addField("Success !", `Role added.`)
    .setFooter("Alliance MGUI", "https://images-ext-2.discordapp.net/external/CG27bf2Z3NWEsRzJKw395DV6uSrhORuv3doYwvhDEmY/https/cdn.discordapp.com/icons/516766583708712960/003eaba26c391c3d154787e9df070906.jpg?width=80&height=80")
    .setTimestamp(timestamp);

   //!addrole @andrew Dog Person
  if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
  if (args[0] == "help") {
    message.reply("Usage: !addrole <user> <role>");
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!rMember) return errors.cantfindUser(message.channel);
  let role = args.join(" ").slice(22);
  if (!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if (!gRole) return message.reply("Couldn't find that role.");

  if (rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
  await (rMember.addRole(gRole.id));
  
   message.delete().catch(O_o=>{});
  message.channel.send(addroleembed)

  try {
    await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
  } catch (e) {
    console.log(e.stack);
    message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
  }
}




 if(cmd === `${prefix}removerole`){

  let removeroleembed = new Discord.RichEmbed()
     .setAuthor("Alliance MGUI")
     .setDescription("Remove role Command")
    .setColor("#00FFFF ")
    .addField("Success !", `Role removed.`)
    .setFooter("Alliance MGUI", "https://images-ext-2.discordapp.net/external/CG27bf2Z3NWEsRzJKw395DV6uSrhORuv3doYwvhDEmY/https/cdn.discordapp.com/icons/516766583708712960/003eaba26c391c3d154787e9df070906.jpg?width=80&height=80")
    .setTimestamp(timestamp);

 if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
  if(args[0] == "help"){
    message.reply("Usage: !removerole <user> <role>");
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user, yo.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
  await(rMember.removeRole(gRole.id));

   message.delete().catch(O_o=>{});
  message.channel.send(removeroleembed)

  try{
    await rMember.send(`RIP, you lost the ${gRole.name} role.`)
  }catch(e){
    message.channel.send(`RIP to <@${rMember.id}>, We removed ${gRole.name} from them. We tried to DM them, but their DMs are locked.`)
  }
}








if(cmd === `${prefix}whitelist`){

    let bicon = bot.user.displayAvatarURL;
   let whitelistEmbed = new Discord.RichEmbed()
     .setAuthor("Alliance MGUI")
    .setDescription("Game Whitelister")
    .setColor("#00FFFF")
    .addField("Whitelist", `<@${message.author.id}> Use !whitelist then your game Id`)
    .setFooter("Alliance MGUI", "https://images-ext-2.discordapp.net/external/CG27bf2Z3NWEsRzJKw395DV6uSrhORuv3doYwvhDEmY/https/cdn.discordapp.com/icons/516766583708712960/003eaba26c391c3d154787e9df070906.jpg?width=80&height=80")
    .setTimestamp(timestamp);

    message.delete().catch(O_o=>{});
    return message.channel.send(whitelistEmbed);
  }












if(cmd === `${prefix}whitelist`){


   let whitelistEmbed = new Discord.RichEmbed()
     .setAuthor("Alliance MGUI")
    .setDescription("Game Whitelister")
    .setColor("#00FFFF")
    .addField("Whitelist", `<@${message.author.id}> Use !whitelist YOUR GAME ID`)
    .setFooter("Alliance MGUI", "https://images-ext-2.discordapp.net/external/CG27bf2Z3NWEsRzJKw395DV6uSrhORuv3doYwvhDEmY/https/cdn.discordapp.com/icons/516766583708712960/003eaba26c391c3d154787e9df070906.jpg?width=80&height=80")
    .setTimestamp(timestamp);

    message.delete().catch(O_o=>{});
    return message.channel.send(whitelistEmbed);

}


});

bot.login(botconfig.token);