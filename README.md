# Nome super criativo para o bot

Esse bot para discord, feito inteiramente em Typescript (💙), lê e reproduz
áudios locais da máquina em forma de broadcast, ou seja, em todas as conexões
o bot reproduz o mesmo aúdio.

O bot pode ser usado como uma rádio pessoal baseada em arquivos, transmitindo o
mesmo conteúdo para vários servidores ao mesmo tempo.

Visto que o bot lê os arquivos locais somente uma pessoa tem acesso às funções.
O ID do usuário, o caminho da pasta e o token de bot do discord devem ser
fornecidos como variáveis de ambiente.

O bot usa o `ffmpeg` como dependência extra, que é usado para fazer a conversão
dos arquivos em streams de áudio processáveis pelo Discord. Para executar o bot
assegure-se de possui-lo instalado e no path do sistema. O download para todos
os sistemas pode ser feito em https://ffmpeg.org/ .

## Comandos do bot

Todos os comandos usam o prefixo `l!`, para mudar o prefixo altere o arquivo
settings.json

### connect

Conecta o bot no canal em que o usuário está conectado.

### leave

Sai do canal em que está conectado naquele servidor.

### pause

Pausa o broadcast.

### resume

Continua o broadcast pausado.

### next

Avança para a próxima áudio da fila.

### previous

Retorna para a áudio anterior da fila.

### shuffle

Embaralha os áudios da fila.

### search `{termos da pesquisa}`

Faz uma pesquisa e retorna, no máximo, 5 resultados por proximidade do termo de
pesquisa. Para selecionar entre uma das opções, escolha uma das opções reagidas
pelo bot.

## Desenvolvimento

O projeto usa o yarn como instalador de pacotes, tenha o `yarn classic`
instalado, além de o `ffmpeg` incluído no path do sistema.

Clone o repositório, instale as dependências e use `yarn start` para iniciar o
bot já com o auto reload usando o nodemon.

Para compilar os arquivos para javascript simplesmente use `yarn build`, que
todo o código será compilado pelo Babel.
