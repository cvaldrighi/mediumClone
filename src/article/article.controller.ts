import { User } from "@app/user/decorators/user.decorator";
import { AuthGuard } from "@app/user/guards/auth.guard";
import { UserEntity } from "@app/user/user.entity";
import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UsePipes } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { ArticleResponseInterface } from "./types/articleResponse.interface";
import { ArticlesResponseInterface } from "./types/articlesResponse.interface";
import { Pagination } from "nestjs-typeorm-paginate";
import { ArticleEntity } from "./article.entity";
import { BackendValidationPipe } from "@app/shared/pipes/backendValidation.pipe";

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<ArticleEntity>> {
        limit = limit > 100 ? 100 : limit;
        return this.articleService.paginate({page, limit});
    }

    @Get('/filter')
    async findByFilter(@Query() query: any): Promise<ArticlesResponseInterface> {
       return await this.articleService.findByFilter(query);
    }

    @Get('feed')
    @UseGuards(AuthGuard)
    async getFeed(
        @User('id') currentUserId: number,
        @Query() query: any
    ): Promise<ArticlesResponseInterface> {
        return await this.articleService.getFeed(currentUserId, query);
    }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new BackendValidationPipe())
    async create(
        @User() currentUser: UserEntity, 
        @Body('article') createArticleDto: CreateArticleDto
    ): Promise<ArticleResponseInterface> {
        const article = await this.articleService.createArticle(currentUser, createArticleDto);
        return this.articleService.buildArticleResponse(article);
    }

    @Get(':slug')
    async getSingleArticle(@Param('slug') slug: string): Promise<ArticleResponseInterface> {
        const article = await this.articleService.findBySlug(slug)
        return this.articleService.buildArticleResponse(article);
    }

    @Delete(':slug')
    @UseGuards(AuthGuard)
    async deleteArticle(@User('id') currentUserId: number, @Param('slug') slug: string) {
        return await this.articleService.deleteArticle(slug, currentUserId);
    }

    @Put(':slug')
    @UseGuards(AuthGuard)
    @UsePipes(new BackendValidationPipe())
    async updateArticle(
        @User('id') currentUserId: number,
        @Param('slug') slug: string,
        @Body('article') updateArticleDto: CreateArticleDto   
    ){
        const article = await this.articleService.updateArticle(slug, updateArticleDto, currentUserId);
        return this.articleService.buildArticleResponse(article);
    }
}