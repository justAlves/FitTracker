
# FitTracker

Um app de monitoramento de consumo de água e pausas para alongamento e caminhadas.


## Demonstração

Instale o [Apk](https://drive.google.com/file/d/15-Uq3YEmwrYSz9vwKtGmkJ3vVNWUN7RA/view?usp=drive_link) para android e teste agora mesmo



## Funcionalidades

- Rastreador de água ingerida e lembretes
- Rastreador de pausas para andar/alongar e lembretes
- Ajuste de volume de água diário
- Ajuste de hora ativa/acordado
- Botão para marcar que ingeriu a quantidade sugerida de água diretamente na notificação
- Botão para marcar que pausou para andar/alongar diretamente na notificação
## Instalação

Instale o Node 18. Você pode usar o asdf para instalar usando:

```bash
asdf install
```

Instale os pacotes do npm com:

```bash
npm install
```

### Configure seu ambiente de desenvolvimento Android

Siga as recomendações do [Capacitor](https://capacitorjs.com/docs/getting-started/environment-setup) para configurar o seu ambiente de desenvolvimento.

### Configurando o ambiente (com docker)
Atualmente, isso funciona apenas para Android no Linux.

Instale o Docker

Execute
 ```bash
makeup
``` 
na pasta raiz do projeto, isso criará o container e
anexá-lo a ele.

Execute

```bash
npm install
```

Agora você está pronto para ir =).

Rode os seguintes comandos

```bash
  npm run build
  npm run dev:android
```
    
