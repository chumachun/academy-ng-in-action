using Microsoft.Azure.Cosmos;

namespace Api.Cosmos;

public interface ICosmosService
{
    Container Messages { get; }
    Container Users { get; }
}