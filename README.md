# wp-auto-index-php
A command line that create index.php files with *Silence is golen!* comment in all directories to prevent WordPress project directories from listing.

## Installation

```bash
npm install -g wp-auto-index-php


## Usages

```bash
cd /your-wp-project-directory
wp-auto-index-php

By default, it doesn't create new file if a index.php file is exists in a directory, use `-f` or `--force` argument to force create new files. For example:

```bash
wp-auto-index-php -f