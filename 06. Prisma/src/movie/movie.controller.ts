import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { MovieService } from "./movie.service";
import { Movie } from "@prisma/client";

@Controller("movies")
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async createMovie(@Body() data: any): Promise<Movie> {
    return this.movieService.createMovie(data);
  }

  @Post("bulk")
  async createMultipleMovies(@Body() data: any[]): Promise<{ count: number }> {
    return this.movieService.createMultipleMovies(data);
  }

  @Get()
  async getAllMovies(): Promise<Movie[]> {
    return this.movieService.getAllMovies();
  }

  @Get(":id")
  async getMovieById(@Param("id") id: string): Promise<Movie | null> {
    return this.movieService.getMovieById(Number(id));
  }

  @Put(":id")
  async updateMovie(
    @Param("id") id: string,
    @Body("title") title: string,
    @Body("description") description: string
  ): Promise<Movie> {
    return this.movieService.updateMovie(Number(id), title, description);
  }

  @Delete(":id")
  async deleteMovie(@Param("id") id: string): Promise<Movie> {
    return this.movieService.deleteMovie(Number(id));
  }
}
