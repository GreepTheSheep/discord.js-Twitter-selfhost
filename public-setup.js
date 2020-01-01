const Discord = require('discord.js')
const Enmap = require('enmap')

function setup(message, client, config, functiondate, functiontime){
    if (message.content == '<@661967218174853121>' || message.content == '<@!661967218174853121>'){
        if(message.member.hasPermission("ADMINISTRATOR")){
            message.channel.send('Do you want to setup me? (send `yes` or `no`)')
            const filter = m => message.author == m.author;
            const collector = message.channel.createMessageCollector(filter, {time: 30000, max: 1});
            collector.on('collect', m => {
                if (m.content.toLowerCase() == 'yes'){
                    db = new Enmap({name:'db_'+message.guild.id})
                    message.channel.send('Here we go! First, send me your Twitter account name *(it will be something like @GreepTheSheep)*')
                    const collector2 = message.channel.createMessageCollector(filter, {time: 60000, max: 1});
                    collector2.on('collect', m => {
                        message.channel.send(`Ok, so your Twitter account URL will be https://twitter.com/${m.content.replace('@','')} ? (\`yes\` or \`no\`)`)
                        var acc = m.content;
                        const collector3 = message.channel.createMessageCollector(filter, {time: 30000, max: 1});
                        collector3.on('collect', m => {
                            if (m.content.toLowerCase() == 'yes'){
                                db.set('twitter_name', acc.replace('@',''))
                                message.channel.send(`Ok ${acc.replace('@','')}, now mention the channel where I'll send your tweets`)
                                const collector4 = message.channel.createMessageCollector(filter, {time: 30000, max: 1});
                                collector4.on('collect', m => {
                                    var ch = m.mentions.channels.first()
                                    if (!ch) return message.reply('That\'s not a channel, canceling setup *(please re-mention me to restart the setup)*')
                                    db.set('channel_id', ch.id)
                                    message.channel.send(`Ok, now all new tweets by ${acc} will be sent in <#${ch.id}>. Thanks for setting me!\n\`Tip: type "@MyTweets config" to see more configs like retweets!\``)
                                });
                                collector4.on('end', (collected, reason) => {
                                    if (reason == 'time'){
                                        message.channel.send(`I have nothing, canceling setup`)
                                    }
                                });
                            } else if (m.content.toLowerCase() == 'no') return message.channel.send('okay, canceling setup')
                            else return message.channel.send('That\'s not a good answer, canceling setup')
                        });
                        collector3.on('end', (collected, reason) => {
                            if (reason == 'time'){
                                message.channel.send(`I have nothing, canceling setup`)
                            }
                        });
                    });
                    collector2.on('end', (collected, reason) => {
                        if (reason == 'time'){
                            message.channel.send(`I have nothing, canceling setup`)
                        }
                    });
                } else if (m.content.toLowerCase() == 'no') return message.channel.send('okay, canceling setup')
                else return message.channel.send('That\'s not a good answer, canceling setup')
            });
            collector.on('end', (collected, reason) => {
                if (reason == 'time'){
                    message.channel.send(`I have nothing, canceling setup`)
                }
            });
        } else return message.reply('You\'re not an administrator of this server. Sorry!')
    }
    if (message.content == '<@661967218174853121> config' || message.content == '<@!661967218174853121> config'){

    }
}
module.exports = setup