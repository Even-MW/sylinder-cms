import { article } from './pages/article'
import articleBlock from './objects/articleBlock'
import blockContent from './objects/blockContent'
// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
import imageBlock from './objects/imageBlock'
import ingredient from './objects/ingredient'
import mediaBlock from './objects/mediaBlock'
import { pageBuilder } from './pages/pagebuilder'
import { recipe } from './pages/recipe'
import recipeBlock from './objects/recipeBlock'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import site from './pages/site'
import youtube from './objects/youtube'
// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    pageBuilder,
    article,
    recipe,
    site,
    //Objects
    blockContent,
    youtube,
    imageBlock,
    mediaBlock,
    recipeBlock,
    articleBlock,
    ingredient
  ]),
})
