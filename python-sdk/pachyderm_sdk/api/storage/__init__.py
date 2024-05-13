# Generated by the protocol buffer compiler.  DO NOT EDIT!
# sources: api/storage/fileset.proto
# plugin: python-betterproto
# This file has been @generated
from dataclasses import dataclass
from typing import (
    TYPE_CHECKING,
    AsyncIterable,
    AsyncIterator,
    Dict,
    Iterable,
    Iterator,
    List,
    Optional,
    Union,
)

import betterproto
import betterproto.lib.google.protobuf as betterproto_lib_google_protobuf
import grpc


if TYPE_CHECKING:
    import grpc


@dataclass(eq=False, repr=False)
class AppendFile(betterproto.Message):
    """
    AppendFile will append the provided data to the file with the specified
    path. If a file with the specified path doesn't exist, it will be created.
    """

    path: str = betterproto.string_field(1)
    data: Optional[bytes] = betterproto.message_field(2, wraps=betterproto.TYPE_BYTES)


@dataclass(eq=False, repr=False)
class DeleteFile(betterproto.Message):
    """
    DeleteFile will delete the file with the specified path. If a file with the
    specified path doesn't exist, the delete will be a no-op.
    """

    path: str = betterproto.string_field(1)


@dataclass(eq=False, repr=False)
class CreateFilesetRequest(betterproto.Message):
    """
    A CreateFilesetRequest corresponds to a single file modification. Supported
    file modifications are append and delete. A put / overwrite file
    modification can be performed by a delete followed by an append.  TODO:
    Decide how to handle datums.
    """

    append_file: "AppendFile" = betterproto.message_field(1, group="modification")
    delete_file: "DeleteFile" = betterproto.message_field(2, group="modification")


@dataclass(eq=False, repr=False)
class CreateFilesetResponse(betterproto.Message):
    fileset_id: str = betterproto.string_field(1)


@dataclass(eq=False, repr=False)
class FileFilter(betterproto.Message):
    path_range: "PathRange" = betterproto.message_field(1, group="filter")
    """Only emit files with paths in the provided path range."""

    path_regex: str = betterproto.string_field(2, group="filter")
    """
    Only emit files with paths that match the provided regular expression.
    """


@dataclass(eq=False, repr=False)
class ReadFilesetRequest(betterproto.Message):
    fileset_id: str = betterproto.string_field(1)
    filters: List["FileFilter"] = betterproto.message_field(2)
    """
    Filters constrain which files are emitted. A file is only emitted if it
    makes it through all of the filters sequentially.
    """

    empty_files: bool = betterproto.bool_field(3)
    """If true, then the file data will be omitted from the stream."""


@dataclass(eq=False, repr=False)
class ReadFilesetResponse(betterproto.Message):
    """
    A ReadFilesetResponse corresponds to a single chunk of data in a file.
    Small or empty files will be contained within a single message, while large
    files may be spread across multiple messages. For files spread across
    multiple messages, each message will have the same path and the content
    will be returned in append order.
    """

    path: str = betterproto.string_field(1)
    data: Optional[bytes] = betterproto.message_field(2, wraps=betterproto.TYPE_BYTES)


@dataclass(eq=False, repr=False)
class RenewFilesetRequest(betterproto.Message):
    fileset_id: str = betterproto.string_field(1)
    ttl_seconds: int = betterproto.int64_field(2)
    """The TTL, in seconds, for the fileset after renewal."""


@dataclass(eq=False, repr=False)
class ComposeFilesetRequest(betterproto.Message):
    fileset_ids: List[str] = betterproto.string_field(1)
    ttl_seconds: int = betterproto.int64_field(2)
    """The TTL, in seconds, for the composite fileset that is created."""


@dataclass(eq=False, repr=False)
class ComposeFilesetResponse(betterproto.Message):
    fileset_id: str = betterproto.string_field(1)


@dataclass(eq=False, repr=False)
class ShardFilesetRequest(betterproto.Message):
    """
    If both num_files and size_bytes are set, shards are created based on
    whichever threshold is surpassed first. If a shard configuration field
    (num_files, size_bytes) is unset, the storage's default value is used.
    """

    fileset_id: str = betterproto.string_field(1)
    num_files: int = betterproto.int64_field(2)
    """Number of files targeted in each shard."""

    size_bytes: int = betterproto.int64_field(3)
    """Size (in bytes) targeted for each shard."""


@dataclass(eq=False, repr=False)
class PathRange(betterproto.Message):
    """
    PathRange is a range of paths. The range is inclusive, exclusive: [Lower,
    Upper).
    """

    lower: str = betterproto.string_field(1)
    upper: str = betterproto.string_field(2)


@dataclass(eq=False, repr=False)
class ShardFilesetResponse(betterproto.Message):
    shards: List["PathRange"] = betterproto.message_field(1)


@dataclass(eq=False, repr=False)
class GraphFilesetRequest(betterproto.Message):
    fileset_id: str = betterproto.string_field(1)


@dataclass(eq=False, repr=False)
class GraphFilesetResponse(betterproto.Message):
    graph: str = betterproto.string_field(1)


class FilesetStub:

    def __init__(self, channel: "grpc.Channel"):
        self.__rpc_create_fileset = channel.stream_unary(
            "/storage.Fileset/CreateFileset",
            request_serializer=CreateFilesetRequest.SerializeToString,
            response_deserializer=CreateFilesetResponse.FromString,
        )
        self.__rpc_read_fileset = channel.unary_stream(
            "/storage.Fileset/ReadFileset",
            request_serializer=ReadFilesetRequest.SerializeToString,
            response_deserializer=ReadFilesetResponse.FromString,
        )
        self.__rpc_renew_fileset = channel.unary_unary(
            "/storage.Fileset/RenewFileset",
            request_serializer=RenewFilesetRequest.SerializeToString,
            response_deserializer=betterproto_lib_google_protobuf.Empty.FromString,
        )
        self.__rpc_compose_fileset = channel.unary_unary(
            "/storage.Fileset/ComposeFileset",
            request_serializer=ComposeFilesetRequest.SerializeToString,
            response_deserializer=ComposeFilesetResponse.FromString,
        )
        self.__rpc_shard_fileset = channel.unary_unary(
            "/storage.Fileset/ShardFileset",
            request_serializer=ShardFilesetRequest.SerializeToString,
            response_deserializer=ShardFilesetResponse.FromString,
        )
        self.__rpc_graph_fileset = channel.unary_unary(
            "/storage.Fileset/GraphFileset",
            request_serializer=GraphFilesetRequest.SerializeToString,
            response_deserializer=GraphFilesetResponse.FromString,
        )

    def create_fileset(
        self,
        request_iterator: Union[
            AsyncIterable["CreateFilesetRequest"], Iterable["CreateFilesetRequest"]
        ],
    ) -> "CreateFilesetResponse":

        return self.__rpc_create_fileset(request_iterator)

    def read_fileset(
        self,
        *,
        fileset_id: str = "",
        filters: Optional[List["FileFilter"]] = None,
        empty_files: bool = False
    ) -> Iterator["ReadFilesetResponse"]:
        filters = filters or []

        request = ReadFilesetRequest()
        request.fileset_id = fileset_id
        if filters is not None:
            request.filters = filters
        request.empty_files = empty_files

        for response in self.__rpc_read_fileset(request):
            yield response

    def renew_fileset(
        self, *, fileset_id: str = "", ttl_seconds: int = 0
    ) -> "betterproto_lib_google_protobuf.Empty":

        request = RenewFilesetRequest()
        request.fileset_id = fileset_id
        request.ttl_seconds = ttl_seconds

        return self.__rpc_renew_fileset(request)

    def compose_fileset(
        self, *, fileset_ids: Optional[List[str]] = None, ttl_seconds: int = 0
    ) -> "ComposeFilesetResponse":
        fileset_ids = fileset_ids or []

        request = ComposeFilesetRequest()
        request.fileset_ids = fileset_ids
        request.ttl_seconds = ttl_seconds

        return self.__rpc_compose_fileset(request)

    def shard_fileset(
        self, *, fileset_id: str = "", num_files: int = 0, size_bytes: int = 0
    ) -> "ShardFilesetResponse":

        request = ShardFilesetRequest()
        request.fileset_id = fileset_id
        request.num_files = num_files
        request.size_bytes = size_bytes

        return self.__rpc_shard_fileset(request)

    def graph_fileset(self, *, fileset_id: str = "") -> "GraphFilesetResponse":

        request = GraphFilesetRequest()
        request.fileset_id = fileset_id

        return self.__rpc_graph_fileset(request)
