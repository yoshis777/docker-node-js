## 概要
[Docker + docker-compose + puppeteer でスクレイピングしてみた](https://qiita.com/takayuki-miura0203/items/4fa4cdc9ef0c07a857a9)を参考に
スクレイピング用にpuppeteerをnode.jsで起動させるためのコンテナ環境を準備する。  
上記環境のコンテナをビルドするDockerfileを用意し、
docker-composeにてコンテナを起動できるようにする。

Dockerfileについては、[Running Puppeteer in Docker](https://github.com/GoogleChrome/puppeteer/blob/v1.12.1/docs/troubleshooting.md#running-puppeteer-in-docker)に記載のものをそのままを流用している。

## 起動まで
```bash
$ docker-compose run --rm --entrypoint /bin/sh puppeteer

(コンテナ作成及び起動...)

$ node example.js

```
[example.com](https://example.com/)の画面スクリーンショットであるexample.pngが作成されれば成功  

※puppetterはグローバルに導入されているので、example.jsの起動だけであれば、npm installは不要

## ローカルで扱う場合
ローカルにnode.jsを導入した状態で
```bash
$ npm install
```

## practiceフォルダ内のjsファイルについて
jsライブラリをrequireするので、コンテナ内で以下コマンドが必要
```bash
$ npm install
$ yarn install
```
```bash
$ node practice/page_transition.js
```