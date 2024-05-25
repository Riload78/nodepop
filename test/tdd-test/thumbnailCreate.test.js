const { describe, expect, it } = require('@jest/globals')
const thumbnailCreate = require('../../lib/thumbnailCreate')
const fs = require('fs')
const path = require('path')

const imagePath = path.resolve(__dirname, '../../public/images/test.jpg')
const thumbnailPath = path.resolve(__dirname, '../../public/images/thumbnail')

describe('Test de thumbnailCreate', () => {
  it('thumbnailCreate must be created', async () => {
    expect(await thumbnailCreate(imagePath)).toBeDefined()
  })
  it('File must be created', async () => {
    expect(fs.existsSync(imagePath)).toBe(true)
  })
  it('File must be created', async () => {
    expect(fs.existsSync(thumbnailPath)).toBe(true)
  })
})
