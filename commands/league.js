const axios = require("axios");
const { host, host_summoner, host_ddragon } = require("..//config.json");
const { MessageEmbed } = require("discord.js");

const fetchRiot = async (uri) => {
  const { data } = await axios.get(uri, {
    headers: { "X-Riot-Token": process.env.RIOT_KEY },
  });

  return data;
};

module.exports = {
  name: "league",
  description: "Get League of Legends Summoner stats!",
  async execute(message, args) {
    const [summoner] = args;

    const data = await fetchRiot(
      `${host_summoner}/summoner/v4/summoners/by-name/${encodeURI(summoner)}`
    );

    const dataGames = await fetchRiot(
      `${host}/match/v5/matches/by-puuid/${data.puuid}/ids?start=0&count=5`
    );

    const games = await Promise.all(
      dataGames.map(async (id) => {
        const {
          info: { gameCreation, gameDuration, gameId, gameMode, participants },
        } = await fetchRiot(`${host}/match/v5/matches/${id}`);

        return {
          gameCreation: gameCreation,
          gameDuration: gameDuration,
          gameId: gameId,
          gameMode: gameMode,
          ...participants.filter((item) => {
            return item.puuid == data.puuid;
          })[0],
        };
      })
    );

    const embed = new MessageEmbed()
      .setTitle("Statistics about the last five games.")
      .setAuthor(
        data.name,
        `${host_ddragon}/11.15.1/img/profileicon/${data.profileIconId}.png`
      )
      .addFields(
        {
          name: games[0].championName,
          value: `K: ${games[0].kills} | D: ${games[0].deaths} | A: ${
            games[0].assists
          }\n**Mode**: ${games[0].gameMode}\n**Result**: ${
            games[0].win ? "Win" : "Lost"
          }`,
          inline: true,
        },
        {
          name: games[1].championName,
          value: `K: ${games[1].kills} | D: ${games[1].deaths} | A: ${
            games[1].assists
          }\n**Mode**: ${games[1].gameMode}\n**Result**: ${
            games[1].win ? "Win" : "Lost"
          }`,
          inline: true,
        },
        {
          name: games[2].championName,
          value: `K: ${games[2].kills} | D: ${games[2].deaths} | A: ${
            games[2].assists
          }\n**Mode**: ${games[2].gameMode}\n**Result**: ${
            games[2].win ? "Win" : "Lost"
          }`,
          inline: true,
        },
        {
          name: games[3].championName,
          value: `K: ${games[3].kills} | D: ${games[3].deaths} | A: ${
            games[3].assists
          }\n**Mode**: ${games[3].gameMode}\n**Result**: ${
            games[3].win ? "Win" : "Lost"
          }`,
          inline: true,
        },
        {
          name: games[4].championName,
          value: `K: ${games[4].kills} | D: ${games[4].deaths} | A: ${
            games[4].assists
          }\n**Mode**: ${games[4].gameMode}\n**Result**: ${
            games[4].win ? "Win" : "Lost"
          }`,
          inline: true,
        }
      );

    message.channel.send(embed);
  },
};
