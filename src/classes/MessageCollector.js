const Main = require("./MainCollector");

class MessageCollector extends Main {
  constructor(client, channel, filter, options = {}){
    super(filter, options);
    this.channel = channel;
    this.results = 0;

    const massDeleteListener = messages => {
      for(const message of messages.values()) this.messageDispose(message)
    };

    this._handleChannelRemoval = this._handleChannelRemoval.bind(this);
    this._handleGuildRemoval = this._handleGuildRemoval.bind(this);

    client.on("messageCreate", this.messageCollect);
    client.on("messageDelete", this.messageDispose);
    client.on("messageDeleteBulk", massDeleteListener);
    client.on("channelDelete", this._handleChannelRemoval);
    client.on("guildDelete", this._handleGuildRemoval);

    this.once("end", () => {
      client.removeListener("messageCreate", this.messageCollect);
      client.removeListener("messageDelete", this.messageDispose);
      client.removeListener("messageDeleteBulk", massDeleteListener);
      client.removeListener("channelDelete", this._handleChannelRemoval);
      client.removeListener("guildDelete", this._handleGuildRemoval);
    })
  }

  collect(message){
    if(this.channel.id !== message.channel.id) return null;
    this.results++;
    return message.id
  }

  dispose(message){
    return this.channel.id === message.channel.id ? message.id : null
  }

  endCause(){
    if(this.options.max && this.collected.size >= this.options.max) return "max";
    if(this.options.maxLimit && this.received === this.options.maxLimit) return "maxProcessed";
    return null;
  }

  _handleChannelRemoval(channel){
    if(this.channel.id === channel.id){
      this.stop("channelDelete");
    }
  }

  _handleGuildRemoval(guild){
    if(this.channel.guild && guild.id === this.channel.guild.id){
      this.stop("guildDelete");
    }
  }
}

module.exports = MessageCollector;