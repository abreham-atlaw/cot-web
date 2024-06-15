
export default class RepositoryProvider {
  private static readonly repositories: Map<new () => any, any> = new Map();

  public static provide<T>(repository: new () => T): T {
    if(this.repositories.get(repository) === undefined){
        this.repositories.set(repository, new repository);
    }
    return this.repositories.get(repository)
  }
}