import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Movie } from "@prisma/client";

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  // Create one movie
  async createMovie(data: {
    title: string;
    description: string;
    genre: string;
    releaseDate: Date;
    rating: number;
  }): Promise<Movie> {
    return this.prisma.movie.create({ data });
  }

  // Create multiple movies
  async createMultipleMovies(
    data: {
      title: string;
      description: string;
      genre: string;
      releaseDate: Date;
      rating: number;
    }[]
  ): Promise<{ count: number }> {
    return this.prisma.movie.createMany({ data });
  }

  // Get all movies
  async getAllMovies(): Promise<Movie[]> {
    return this.prisma.movie.findMany();
  }

  // Get movie by ID
  async getMovieById(movieId: number): Promise<Movie | null> {
    return this.prisma.movie.findUnique({ where: { id: movieId } });
  }

  // Update movie
  async updateMovie(
    movieId: number,
    updatedTitle: string,
    updatedDescription: string
  ): Promise<Movie> {
    return this.prisma.movie.update({
      where: { id: movieId },
      data: { title: updatedTitle, description: updatedDescription },
    });
  }

  // Delete movie
  async deleteMovie(movieId: number): Promise<Movie> {
    return this.prisma.movie.delete({ where: { id: movieId } });
  }
}
