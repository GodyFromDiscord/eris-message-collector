# eris-message-collector | ![npm](https://img.shields.io/npm/v/eris-message-collector?style=for-the-badge)
Makes collecting messages using the Eris librarier way easier!

![GitHub all releases](https://img.shields.io/github/downloads/GodyFromDiscord/days-until-christmas/total) ![GitHub forks](https://img.shields.io/github/forks/GodyFromDiscord/eris-message-collector?style=plastic) ![GitHub Repo stars](https://img.shields.io/github/stars/GodyFromDiscord/eris-message-collector?style=plastic)

## Installation
> npm i eris-message-collector

## Usage
```javascript
/* Install/Import Eris Packages*/
const Eris = require("eris");
const client = new Eris("BOT_TOKEN");

/* Install/Import the Collector Package */
const { MessageCollector } = require('eris-message-collector');

client.on("ready", () => {
  console.log("Bot is ready!")
})

client.on("messageCreate", async(message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  if(message.content == "messageCollector"){
    message.channel.createMessage("Hey! Go ahead and say \`Collect Me\`"); // Create our message prompting the user.

    let filter = (m) => message.author.id === m.author.id && m.content === "Collect Me"; // Create our filter which looks for "Collect Me" from the message author.

    const collector = new MessageCollector(client, message.channel, filter, { // Create our collector with our options set as the current channel, the client, filter and our time
      time: 5000 * 15
    });

    collector.on("collect", (m) => { // If our filter is followed expect output should be the authors information.
      console.log(m.author)
    })
  }
})

client.connect()
```

## Contact me for help!
[Discord](https://discord.gg/3BhFJx2RZY)

## License
Refer to the [License](https://github.com/GodyFromDiscord/eris-message-collector/blob/main/LICENSE) file.
