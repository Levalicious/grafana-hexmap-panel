# Hexmap for Grafana

[![Build](https://github.com/marcusolsson/grafana-hexmap-panel/workflows/CI/badge.svg)](https://github.com/marcusolsson/grafana-hexmap-panel/actions?query=workflow%3A%22CI%22)
[![Release](https://github.com/marcusolsson/grafana-hexmap-panel/workflows/Release/badge.svg)](https://github.com/marcusolsson/grafana-hexmap-panel/actions?query=workflow%3ARelease)
[![Marketplace](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=marketplace&prefix=v&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22marcusolsson-hexmap-panel%22%29%5D.version&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/marcusolsson-hexmap-panel)
[![Downloads](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=downloads&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22marcusolsson-hexmap-panel%22%29%5D.downloads&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/marcusolsson-hexmap-panel)
[![License](https://img.shields.io/github/license/marcusolsson/grafana-hexmap-panel)](LICENSE)
[![Twitter](https://img.shields.io/twitter/follow/marcusolsson?color=%231DA1F2&label=twitter&style=plastic)](https://twitter.com/marcusolsson)

A [Grafana](https://grafana.com) panel plugin for hexagonal tiling of data.

![Screenshot](https://github.com/marcusolsson/grafana-hexmap-panel/raw/main/src/img/screenshot.png)

## Maintenance

I maintain [several plugins](https://marcus.se.net/projects/) for Grafana. While my employer allows me to spend some time on developing plugins, most of the work happens on evenings and weekends. At the moment, I'm prioritizing fixing bugs and reviewing PRs over introducing new features.

If you'd still like to propose a new feature, [create a new Discussion](https://github.com/marcusolsson/grafana-hexmap-panel/discussions/new?category=ideas). While I likely won't be able to work on features myself, I'd be happy to accept pull requests. If you'd like to contribute a feature, please let me know before you start working on it.

## Configuration

This section lists the available configuration options.

### Panel options

#### Dimensions

| Option     | Description                                                                                                    |
|------------|----------------------------------------------------------------------------------------------------------------|
| _Color by_ | Field to use for color. Defaults to the first number field. You can set the color scheme under the Fields tab. |
| _Size by_  | Field to use for size. If empty, all hexagons will be the same size.                                           |
| _Group by_ | Field to group by.                                                                                             |
| _Labels_   | Fields to use as labels in the tooltip.                                                                        |
