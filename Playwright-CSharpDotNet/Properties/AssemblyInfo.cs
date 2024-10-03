using NUnit.Framework;

[assembly: Parallelizable(ParallelScope.All)]
[assembly: LevelOfParallelism(1)] // Adjust the number based on your needs
