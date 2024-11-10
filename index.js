//by MouncetDev
require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client(); 

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);

  const channelId = process.env.CHANNEL_ID;
  const guildId = process.env.GUILD_ID;

  if (!channelId || !guildId) {
    console.error("Channel or Guild ID is not provided. Please check your .env file.");
    return;
  }

  try {
    const channel = await client.channels.fetch(channelId);
    if (!channel) {
      console.error('Voice channel not found.');
      return;
    }

    // Join the voice channel every second
    setInterval(() => {
      const VoiceConnection = joinVoiceChannel({
        channelId: channel.id,
        guildId: guildId,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfMute: true,
        selfDeaf: true,
      });
    }, 1000);
    
  } catch (error) {
    console.error('Error fetching the channel or joining the voice channel:', error.message);
  }
});

client.login(process.env.TOKEN);
