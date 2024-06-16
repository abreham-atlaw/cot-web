import InvitationRepository from "./invitationRepository";
import CoreProviders from "@/di/coreProviders";
import AuthRepository from "./authRepository";
import OrganizationRepository from "@/apps/core/infrastructure/repositories/organizationRepository";
import InviteRequest from "../requests/inviteRequest";
import DataConfigs from "@/configs/dataConfigs";
import Invitation from "../../domain/models/invitation";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import RepositoryProvider from "@/di/repositoryProviders";


// Mock dependencies
jest.mock("@/di/coreProviders");
jest.mock("./authRepository");
jest.mock("@/apps/core/infrastructure/repositories/organizationRepository");

describe("InvitationRepository", () => {
  let invitationRepository: InvitationRepository;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let networkClientMock: jest.Mocked<any>;
  let authRepositoryMock: jest.Mocked<AuthRepository>;
  let organizationRepositoryMock: jest.Mocked<OrganizationRepository>;

  beforeEach(() => {
    networkClientMock = {
      execute: jest.fn(),
    };

    authRepositoryMock = {
      getOrgId: jest.fn(),
    } as unknown as jest.Mocked<AuthRepository>;

    organizationRepositoryMock = {
      getById: jest.fn(),
    } as unknown as jest.Mocked<OrganizationRepository>;

    (CoreProviders.provideNetworkClient as jest.Mock).mockReturnValue(networkClientMock);

    invitationRepository = RepositoryProvider.provide(InvitationRepository);
    invitationRepository["authRepository"] = authRepositoryMock;
    invitationRepository["organizationRepository"] = organizationRepositoryMock;
  });

  it("should send an invitation correctly", async () => {
    const email = "test@example.com";
    const invitation = new Invitation("invitationId", email, 1, "orgId", "Organization Name");
    const orgName = "Organization Name";

    authRepositoryMock.getOrgId.mockResolvedValue("orgId");
    organizationRepositoryMock.getById.mockResolvedValue({ name: orgName });

    await invitationRepository.sendInvitation(email, invitation);

    const link = `${DataConfigs.FRONTEND_URL}/auth/signup/invitationId`;
    expect(networkClientMock.execute).toHaveBeenCalledWith(new InviteRequest(invitation.id!, email, link, orgName));
  });

  it("should create an invitation and send it", async () => {
    const invitation = new Invitation("invitationId", "test@example.com", 1, "orgId", "Organization Name");

    jest.spyOn(EthersModelRepository.prototype, 'create').mockResolvedValue();

    const sendInvitationSpy = jest.spyOn(invitationRepository, 'sendInvitation').mockResolvedValue();

    await invitationRepository.create(invitation);

    expect(EthersModelRepository.prototype.create).toHaveBeenCalledWith(invitation);
    expect(sendInvitationSpy).toHaveBeenCalledWith(invitation.to, invitation);
  });

  it("should filter invitations correctly", async () => {
    const invitation = new Invitation("invitationId", "test@example.com", 1, "orgId", "Organization Name");

    authRepositoryMock.getOrgId.mockResolvedValue("orgId");

    const result = await invitationRepository.filterAll(invitation);

    expect(result).toBe(true);
  });

  it("should not filter invitations from different organizations", async () => {
    const invitation = new Invitation("invitationId", "test@example.com", 1, "differentOrgId", "Organization Name");

    authRepositoryMock.getOrgId.mockResolvedValue("orgId");

    const result = await invitationRepository.filterAll(invitation);

    expect(result).toBe(false);
  });
});